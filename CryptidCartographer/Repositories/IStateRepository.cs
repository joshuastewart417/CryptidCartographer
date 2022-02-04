using CryptidCartographer.Models;
using System.Collections.Generic;

namespace CryptidCartographer.Repositories
{
    public interface IStateRepository
    {
        List<State> GetAllStates();
        State GetStateById(int id);
        public State GetStateIdByName(string stateName);
    }
}