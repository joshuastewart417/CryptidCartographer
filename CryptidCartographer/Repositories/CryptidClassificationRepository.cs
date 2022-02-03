using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using CryptidCartographer.Models;
using Microsoft.Data.SqlClient;
using CryptidCartographer.Utils;

namespace CryptidCartographer.Repositories
{
    public class CryptidClassificationRepository : BaseRepository, ICryptidClassificationRepository
    {
        public CryptidClassificationRepository(IConfiguration config) : base(config) { }

        public CryptidClassification GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT CryptidId, ClassificationId
                        FROM CryptidClassification
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    CryptidClassification cryptidClass = new CryptidClassification();

                    if (reader.Read())
                    {
                        cryptidClass.Id = id;
                        cryptidClass.CryptidId = reader.GetInt32(reader.GetOrdinal("CryptidId"));
                        cryptidClass.ClassificationId = reader.GetInt32(reader.GetOrdinal("ClassificationId"));
                    }

                    reader.Close();

                    return cryptidClass;
                }
            }
        }


        public List<CryptidClassification> GetCryptidClassificationByCryptidId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT cc.Id, cc.CryptidId, cc.ClassificationId, 
                               cl.Name 
                        FROM CryptidClassification cc
                            LEFT JOIN Classification cl ON cl.id = cc.ClassificationId
                            LEFT JOIN Cryptid c on c.id = cc.CryptidId
                        WHERE c.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    List<CryptidClassification> cryptidClassifications = new List<CryptidClassification> { };

                    while (reader.Read())
                    {
                        CryptidClassification cryptidClass = new CryptidClassification()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            CryptidId = reader.GetInt32(reader.GetOrdinal("CryptidId")),
                            ClassificationId = reader.GetInt32(reader.GetOrdinal("ClassificationId")),
                            Classification = new Classification()
                            {
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                            }
                        };

                        cryptidClassifications.Add(cryptidClass);
                    }

                    reader.Close();

                    return cryptidClassifications;
                }
            }
        }

        public void Add(CryptidClassification cryptidClass)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO CryptidClassification (CryptidId, ClassificationId)
                        OUTPUT INSERTED.ID
                        VALUES(@CryptidId, @ClassificationId)";

                    cmd.Parameters.AddWithValue("@CryptidId", cryptidClass.CryptidId);
                    cmd.Parameters.AddWithValue("@ClassificationId", cryptidClass.ClassificationId);

                    int id = (int)cmd.ExecuteScalar();

                    cryptidClass.Id = id;
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
                    cmd.CommandText = @"DELETE FROM CryptidClassification WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void ClearClassificationForCryptid(int cryptidId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM CryptidClassification 
                        WHERE CryptidId = @cryptidId";

                    cmd.Parameters.AddWithValue("@cryptidId", cryptidId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
