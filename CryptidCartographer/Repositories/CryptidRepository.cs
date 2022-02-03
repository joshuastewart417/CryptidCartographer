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

        public List<Cryptid> GetCryptidByStateId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                    SELECT c.Id, c.Name, c.Description, c.ImageUrl, 
                        c.DateCreated, c.UserId, c.StateId,
                        u.[Name] as UserName, u.Email, u.[ImageUrl] as UserImage,
                        s.[Name] as StateName
                    FROM Cryptid c 
                        LEFT JOIN [User] u ON c.UserId = u.id
                        LEFT JOIN State s ON c.StateId = s.id
                        LEFT JOIN CryptidClassification cc ON cc.CryptidId = c.id
                        LEFT JOIN Classification cl on cl.Id = cc.ClassificationId
                    WHERE c.DateCreated < SYSDATETIME() AND cl.Id = 1
                    ORDER BY DateCreated DESC";

                    var cryptids = new List<Cryptid>();

                    cmd.Parameters.AddWithValue("@stateId", id);

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        cryptids.Add(newCryptid(reader));
                    }

                    reader.Close();

                    return cryptids;
                }
            }
        }

        public List<Cryptid> GetCryptidByClassification(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.Name, c.Description, c.ImageUrl, 
                        c.DateCreated, c.UserId, c.StateId,
                        u.[Name] as UserName, u.Email, u.[ImageUrl] as UserImage,
                        s.[Name] as StateName,
                        cl.[Name]
                    FROM Cryptid c 
                        LEFT JOIN [User] u ON c.UserId = u.id
                        LEFT JOIN State s ON c.StateId = s.id
                        LEFT JOIN CryptidClassification cc ON cc.CryptidId = c.id
                        LEFT JOIN Classification cl on cl.Id = cc.ClassificationId
                    WHERE c.DateCreated < SYSDATETIME() AND cl.Id = @classId
                    ORDER BY DateCreated DESC";

                    var cryptids = new List<Cryptid>();

                    cmd.Parameters.AddWithValue("@classId", id);

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        cryptids.Add(newCryptid(reader));
                    }

                    reader.Close();

                    return cryptids;
                }
            }
        }

        public List<Cryptid> GetCryptidSightingByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.Name, c.Description, c.ImageUrl, c.DateCreated,
                               c.UserId, c.StateId,
                               u.[Name] as UserName, u.Email, u.[ImageUrl] as UserImage,
                               s.[Name] as StateName
                        FROM Cryptid c
                               LEFT JOIN [User] u on c.UserId = u.id
                               LEFT JOIN State s on c.StateId = s.id
                        WHERE DateCreated < SYSDATETIME() AND UserId = @id";

                    var cryptids = new List<Cryptid>();

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        cryptids.Add(newCryptid(reader));
                    }

                    reader.Close();

                    return cryptids;
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
                        }
                    }

                    reader.Close();

                    return cryptid;
                }
            }
        }

        public void Add(Cryptid cryptid)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Cryptid (
                            Name, Description, ImageUrl, DateCreated, UserId, StateId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, @Description, @ImageUrl, @DateCreated, @UserId, @StateId)";

                    cmd.Parameters.AddWithValue("@Name", cryptid.Name);
                    cmd.Parameters.AddWithValue("@Description", cryptid.Description);
                    cmd.Parameters.AddWithValue("@ImageUrl", cryptid.ImageUrl);
                    cmd.Parameters.AddWithValue("@DateCreated", cryptid.DateCreated);
                    cmd.Parameters.AddWithValue("@UserId", cryptid.UserId);
                    cmd.Parameters.AddWithValue("@StateId", cryptid.StateId);
                    cryptid.Id = (int)cmd.ExecuteScalar();

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Cryptid cryptid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        UPDATE Cryptid
                            SET Name = @Name,
                                Description = @Description,
                                ImageUrl = @ImageUrl,
                                DateCreated = @DateCreated,
                                UserId = @UserId,
                                StateId = @StateId
                        WHERE id = @id";

                    cmd.Parameters.AddWithValue("@Name", cryptid.Name);
                    cmd.Parameters.AddWithValue("@Description", cryptid.Description);
                    if (cryptid.ImageUrl != null)
                    {
                        cmd.Parameters.AddWithValue("@ImageUrl", cryptid.ImageUrl);
                    } 
                    else
                    {
                        cmd.Parameters.AddWithValue("@ImageUrl", DBNull.Value);
                    }

                    cmd.Parameters.AddWithValue("@DateCreated", cryptid.DateCreated);
                    cmd.Parameters.AddWithValue("@UserId", cryptid.UserId);
                    cmd.Parameters.AddWithValue("@StateId", cryptid.StateId);
                    cmd.Parameters.AddWithValue("@id", cryptid.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Cryptid WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public bool IsCryptidTrackedByUser(int currentUserId, int cryptidId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Track
                        WHERE UserId = @currentUserId AND CryptidId = @cryptidId";

                    cmd.Parameters.AddWithValue("@currentUserId", currentUserId);
                    cmd.Parameters.AddWithValue("@cryptidId", cryptidId);

                    cmd.ExecuteNonQuery();

                    var reader = cmd.ExecuteReader();

                    return reader.Read();
                }
            }
        }

        public List<Cryptid> GetAllUserTrackedCryptids(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.Name, c.Description, c.ImageUrl, c.DateCreated,
                               c.UserId, c.StateId, 
                               u.[Name] as UserName, u.Email, u.[ImageUrl] as UserImage,
                               s.[Name] as StateName,
                               cl.[Name] as ClassName
                        FROM Cryptid c
                               LEFT JOIN Track t on t.CryptidId = c.id
                               LEFT JOIN [User] u ON t.UserId = u.id
                               LEFT JOIN CryptidClassification cc ON cc.CryptidId = c.id
                               LEFT JOIN Classification cl on cl.Id = cc.ClassificationId
                               LEFT JOIN State s ON c.StateId = s.id
                        WHERE DateCreated < SYSDATETIME() AND t.UserId = @id";

                    cmd.Parameters.AddWithValue("@id", userId);

                    var reader = cmd.ExecuteReader();

                    var cryptids = new List<Cryptid>();

                    while (reader.Read())
                    {
                        cryptids.Add(newCryptid(reader));
                    }

                    reader.Close();

                    return cryptids;
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
