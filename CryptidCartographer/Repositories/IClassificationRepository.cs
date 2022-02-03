using CryptidCartographer.Models;
using System.Collections.Generic;

namespace CryptidCartographer.Repositories
{
    public interface IClassificationRepository
    {
        void Add(Classification classification);
        void CreateClassification(Classification classification);
        void Delete(int id);
        List<Classification> GetAllClassifications();
        Classification GetClassById(int id);
        void Update(Classification classification);
    }
}