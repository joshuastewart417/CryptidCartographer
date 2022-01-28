﻿using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptidCartographer.Models;
using CryptidCartographer.Utils;

namespace CryptidCartographer.Repositories
{
    public class CryptidRepository : BaseRepository, ICryptidRepository
    {
        public CryptidRepository(IConfiguration configuration) : base(configuration) { }

        public List<Cryptid> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 SELECT c.Id, c.Name, c.Description, c.ImageUrl, c.DateCreated, c.UserId, c.StateId,
                    u.[Name] as UserName, u.Email, u.[ImageUrl] as UserImage, s.[Name] as StateName,
                    cl.[Name] AS ClassName,
                    cl.Id AS ClassId
                 FROM Cryptid c
                 JOIN [User] u ON c.UserId = u.Id
                 JOIN State s ON c.StateId = s.Id
                 LEFT JOIN CryptidClassification cc ON cc.CryptidId = c.id
                 LEFT JOIN Classification cl on cl.Id = cc.ClassificationId
                 ORDER BY Name ASC";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var cryptids = new List<Cryptid>();
                        while (reader.Read())
                        {
                            cryptids.Add(newCryptid(reader));
                        }

                        return cryptids;
                    }
                }
            }
        }

        public Cryptid GetCryptidById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @$"
                        SELECT c.Id, c.Name, c.Description, c.ImageUrl, c.DateCreated, 
                            c.UserId, c.StateId,
                            u.[Name] AS UserName, u.Email, u.[ImageUrl] as UserImage,
                            s.[Name] AS StateName,
                            cl.[Name] AS ClassName,
                            cl.Id AS ClassId
                        FROM Cryptid c
                            LEFT JOIN [User] u ON c.UserId = u.id
                            LEFT JOIN State s ON c.StateId = s.id
                            LEFT JOIN CryptidClassification cc ON cc.CryptidId = c.id
                            LEFT JOIN Classification cl on cl.Id = cc.ClassificationId
                        WHERE c.id = @id;";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Cryptid cryptid = null;

                    while (reader.Read())
                    {
                        if (cryptid == null)
                        {
                            cryptid = newCryptid(reader);
                        }

                        if (DbUtils.IsNotDbNull(reader, "ClassName"))
                        {
                            Classification classification = new Classification()
                            {
                                Name = DbUtils.GetString(reader, "ClassName"),
                                Id = DbUtils.GetInt(reader, "ClassId")
                            };

                            cryptid.Classifications.Add(classification);
                        }
                    }

                    reader.Close();

                    return cryptid;
                }
            }
        }

        private Cryptid newCryptid(SqlDataReader reader)
        {
            var cryptid = new Cryptid()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Description = DbUtils.GetString(reader, "Description"),
                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                User = new User()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    Name = DbUtils.GetString(reader, "UserName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    ImageUrl = DbUtils.GetString(reader, "UserImage"),

                },
                StateId = DbUtils.GetInt(reader, "StateId"),
                State = new State()
                {
                    Id = DbUtils.GetInt(reader, "StateId"),
                    Name = DbUtils.GetString(reader, "StateName")
                },
                Classifications = new List<Classification>()
            };

            return cryptid;
        }
    }
}
