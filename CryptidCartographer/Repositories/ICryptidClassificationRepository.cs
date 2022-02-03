using CryptidCartographer.Models;
using System.Collections.Generic;

namespace CryptidCartographer.Repositories
{
    public interface ICryptidClassificationRepository
    {
        void Add(CryptidClassification cryptidClass);
        void ClearClassificationForCryptid(int cryptidId);
        void Delete(int id);
        CryptidClassification GetById(int id);
        List<CryptidClassification> GetCryptidClassificationByCryptidId(int id);
    }
}