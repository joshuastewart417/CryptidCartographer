using CryptidCartographer.Models;
using System.Collections.Generic;

namespace CryptidCartographer.Repositories
{
    public interface ICryptidRepository
    {
        List<Cryptid> GetAll();
        Cryptid GetCryptidById(int id);
    }
}