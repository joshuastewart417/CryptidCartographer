using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CryptidCartographer.Models
{
    public class CryptidClassification
    {
        public int Id { get; set; }
        
        public int CryptidId { get; set; }
        public Cryptid Cryptid { get; set; }

        public int ClassificationId { get; set; }
        public Classification Classification { get; set; }
    }
}
