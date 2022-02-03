using CryptidCartographer.Models;

namespace CryptidCartographer.Repositories
{
    public interface ITrackRepository
    {
        void Add(Track track);
        void Delete(int id);
        void Update(Track track);
    }
}