using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptidCartographer.Models;
using CryptidCartographer.Utils;

namespace CryptidCartographer.Repositories
{
    public class CryptidRepository : BaseRepository
    {
        public CryptidRepository(IConfiguration configuration) : base(configuration) { }

        public Cryptid GetCryptidSightingById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @$"
                        SELECT c.Id, c.Name, c.Description, c.ImageUrl, c.DateCreated, 
                            c.UserId, c.StateId,
                            u.Name, u.Email, u.ImageUrl as UserImage,
                            s.[Name] AS StateName,
                            cl.[Name] AS ClassName,
                            cl.Id AS ClassId
                        FROM Cryptid c
                            LEFT JOIN User u ON c.UserId = u.id
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
                            cryptid = NewCryptidFromReader(reader);
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

        private Cryptid NewCryptidFromReader(SqlDataReader reader)
        {
            return new Cryptid()
            {



        //TODO: COMPLETE THIS PRIVATE METHOD FOR NEW CRYPTID OBJECT!!!

                //Id = reader.GetInt32(reader.GetOrdinal("Id")),
                //Title = reader.GetString(reader.GetOrdinal("Title")),
                //Content = reader.GetString(reader.GetOrdinal("Content")),
                //ImageLocation = DbUtils.GetNullableString(reader, "HeaderImage"),
                //CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                //PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                //CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                //Category = new Category()
                //{
                //    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                //    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                //},
                //UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                //UserProfile = new UserProfile()
                //{
                //    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                //    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                //    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                //    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                //    Email = reader.GetString(reader.GetOrdinal("Email")),
                //    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                //    ImageLocation = DbUtils.GetNullableString(reader, "AvatarImage"),
                //    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                //    UserType = new UserType()
                //    {
                //        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                //        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                //    }
                //},
                //Tags = new List<Tag>()
            };
        }
    }
}
