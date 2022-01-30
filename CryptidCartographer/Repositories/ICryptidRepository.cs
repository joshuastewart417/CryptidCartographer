using CryptidCartographer.Models;
using System.Collections.Generic;

namespace CryptidCartographer.Repositories
{
    public interface ICryptidRepository
    {
        void Add(Cryptid cryptid);
        List<Cryptid> GetAll();
        List<Cryptid> GetCryptidByStateId(int id);
        List<Cryptid> GetCryptidByClassification(int id);
        List<Cryptid> GetCryptidSightingByUserId(int id);
        Cryptid GetCryptidById(int id);

    }
}