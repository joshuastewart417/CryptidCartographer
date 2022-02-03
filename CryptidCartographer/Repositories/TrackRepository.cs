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
    public class TrackRepository : BaseRepository, ITrackRepository
    {
        public TrackRepository(IConfiguration config) : base(config) { }

        public void Add(Track track)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Track (UserId, CryptidId);
                        OUTPUT INSERTED.ID
                        VALUES (@userId, @cryptidId)";

                    cmd.Parameters.AddWithValue("@userId", track.UserId);
                    cmd.Parameters.AddWithValue("@cryptidId", track.CryptidId);

                    int id = (int)cmd.ExecuteScalar();

                    track.Id = id;
                }
            }
        }

        public void Update(Track track)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Track
                        SET userId = @userId,
                            cryptidId = @cryptidId
                        WHERE id = @id";

                    cmd.Parameters.AddWithValue("@userId", track.UserId);
                    cmd.Parameters.AddWithValue("@cryptidId", track.CryptidId);

                    cmd.Parameters.AddWithValue("@id", track.Id);

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
                    cmd.CommandText = @"DELETE FROM Track WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
