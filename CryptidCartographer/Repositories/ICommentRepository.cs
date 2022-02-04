using CryptidCartographer.Models;
using System.Collections.Generic;

namespace CryptidCartographer.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void Delete(int id);
        List<Comment> GetCommentsByCryptidId(int cryptidId);
        void Update(Comment comment);
    }
}