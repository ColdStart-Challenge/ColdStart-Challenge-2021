using ColdStart.Models.CosmosDB;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace ColdStart.Repositories
{
    public interface ICatalogRepository
    {
        Task<Icecream> GetIcecream(int id);
    }

    public class CatalogRepository : ICatalogRepository
    {
        public async Task<Icecream> GetIcecream(int id)
        {
            var connString = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING");
            using (var conn = new SqlConnection(connString))
            {
                var qry = "SELECT [Name], [Description], [ImageUrl] FROM [dbo].[Icecreams] WHERE [Id] = @Id";

                await conn.OpenAsync();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = qry;
                    cmd.Parameters.Add(new SqlParameter("Id", id));

                    try
                    {
                        using (var reader = cmd.ExecuteReader())
                        {
                            await reader.ReadAsync();
                            return new Icecream
                            {
                                icecreamId = id,
                                name = reader["Name"].ToString(),
                                description = reader["Description"].ToString(),
                                imageUrl = reader["ImageUrl"].ToString()
                            };
                        }
                    }
                    catch(Exception)
                    {
                        throw;
                    }
                }
            }
        }
    }
}