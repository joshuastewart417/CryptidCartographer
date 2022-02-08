using CryptidCartographer.Models;

namespace CryptidCartographer.Repositories
{
    public interface ITrackRepository
    {
        void Add(Track track);
        void Delete(Track track);
        void Update(Track track);
    }
}