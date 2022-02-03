using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptidCartographer.Models;
using Microsoft.Extensions.Configuration;

namespace CryptidCartographer.Repositories
{
    public class ClassificationRepository : BaseRepository, IClassificationRepository
    {
        public ClassificationRepository(IConfiguration config) : base(config) { }
        public List<Classification> GetAllClassifications()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      Select * from Classification
                                      ORDER BY name ASC";


                    var classifications = new List<Classification>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        classifications.Add(new Classification()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                        });
                    }

                    reader.Close();

                    return classifications;
                }
            }
        }
        public void CreateClassification(Classification classification)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      INSERT INTO Classification (Name)
                                      OUTPUT INSERTED.ID
                                      VALUES (@Name)";

                    cmd.Parameters.AddWithValue("@Name", classification.Name);
                    classification.Id = (int)cmd.ExecuteScalar();

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public Classification GetClassById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT Id, Name
                                      FROM Classification
                                      WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Classification classification = null;

                    while (reader.Read())
                    {
                        if (classification == null)
                        {
                            classification = new Classification()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
                            };
                        }
                    }
                    reader.Close();
                    return classification;
                }
            }
        }

        public void Add(Classification classification)
        {

            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      INSERT INTO Classification (Name) 
                                      OUTPUT INSERTED.ID
                                      VALUES (@Name)";

                    cmd.Parameters.AddWithValue("@Name", classification.Name);

                    int id = (int)cmd.ExecuteScalar();

                    classification.Id = id;
                }
            }
        }

        public void Update(Classification classification)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      UPDATE Classification 
                                      SET Name = @name
                                      WHERE id = @id";
                    cmd.Parameters.AddWithValue("@name", classification.Name);
                    cmd.Parameters.AddWithValue("@id", classification.Id);

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
                    cmd.CommandText = @"
                                      DELETE FROM Tag 
                                      WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
