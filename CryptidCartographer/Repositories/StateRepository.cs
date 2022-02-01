using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using CryptidCartographer.Models;

namespace CryptidCartographer.Repositories
{
    public class StateRepository : BaseRepository, IStateRepository
    {
        public StateRepository(IConfiguration config) : base(config) { }


        public List<State> GetAllStates()
        {

            using (var conn = Connection)

            {
                conn.Open();

                using (var cmd = conn.CreateCommand())

                {
                    cmd.CommandText = @"
                    SELECT *
                    FROM State
                    ORDER BY Name ASC";

                    var states = new List<State>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        states.Add(new State()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });
                    }

                    reader.Close();

                    return states;

                }

            }

        }

        public State GetStateById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               Name
                                          FROM State 
                                         WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    State state = null;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if (state == null)
                        {
                            state = new State()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
                            };
                        }
                    }
                    reader.Close();
                    return state;
                }
            }
        }

    }
}
