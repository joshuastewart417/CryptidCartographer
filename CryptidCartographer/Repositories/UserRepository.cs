using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using CryptidCartographer.Models;
using CryptidCartographer.Utils;

namespace CryptidCartographer.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAllUsers()
        {
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                      Select * from User";


                        var users = new List<User>();

                        var reader = cmd.ExecuteReader();
                        while (reader.Read())
                        {
                            int id = reader.GetInt32(reader.GetOrdinal("Id"));
                            string name = reader.GetString(reader.GetOrdinal("Name"));
                            string email = reader.GetString(reader.GetOrdinal("Email"));
                            string imgUrl = reader.GetString(reader.GetOrdinal("ImageUrl"));
                            string fireId = reader.GetString(reader.GetOrdinal("FirebaseUserId"));

                            users.Add(new User()
                            {
                                Id = id,
                                Name = name,
                                Email = email,
                                ImageUrl = imgUrl,
                                FirebaseUserId = fireId
                            });
                        }

                        reader.Close();

                        return users;
                    }
                }
            }
        }


        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.Name, u.Email, u.ImageUrl, u.FirebaseUserId
                        FROM User u
                        WHERE FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public User GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.Name, u.Email, u.ImageUrl, u.FirebaseUserId
                        FROM User u
                        WHERE u.id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    User user = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO User (Name, Email, ImageUrl, FirebaseUserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name, @Email, @ImageUrl, @FirebaseUserId)";
                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@ImageUrl", user.ImageUrl);
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
