using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using CryptidCartographer.Models;
using CryptidCartographer.Utils;

namespace CryptidCartographer.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }

        public List<Comment> GetCommentsByCryptidId(int cryptidId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT c.Id as cryptidId, cm.Message, u.Name, 
                                             cm.DateCreated, cm.UserId, cm.Id as commentId
                                      FROM Comment cm
                                      JOIN [User] u on cm.UserId = u.Id
                                      JOIN Cryptid c on cm.CryptidId = c.Id
                                      WHERE cm.CryptidId = @cryptidId
                                      ORDER BY DateCreated DESC";

                    cmd.Parameters.AddWithValue("@cryptidId", cryptidId);

                    var comments = new List<Comment>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Message = reader.GetString(reader.GetOrdinal("Message")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            User = new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            },

                            Cryptid = new Cryptid()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id"))
                            }
                        });
                    }

                    reader.Close();

                    return comments;
                }
            }
        }
        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      INSERT INTO Comment (Message, DateCreated, UserId, CryptidId)
                                      OUTPUT INSERTED.ID
                                      VALUES (@Message, @DateCreated, @UserId, @CryptidId)";

                    cmd.Parameters.AddWithValue("@Subject", comment.Message);
                    cmd.Parameters.AddWithValue("@DateCreated", comment.DateCreated);
                    cmd.Parameters.AddWithValue("@UserId", comment.UserId);
                    cmd.Parameters.AddWithValue("@CryptidId", comment.CryptidId);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                                      UPDATE Comment
                                      SET Message = @Message,
                                          DateCreated = @DateCreated
                                      WHERE id = @id";

                    cmd.Parameters.AddWithValue("@Message", comment.Message);
                    cmd.Parameters.AddWithValue("@DateCreated", comment.DateCreated);
                    cmd.Parameters.AddWithValue("@id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM COMMENT WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
