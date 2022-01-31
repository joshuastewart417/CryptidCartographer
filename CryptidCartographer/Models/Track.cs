﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CryptidCartographer.Models
{
    public class Track
    {
        public int Id { get; set; }
        
        public int UserId { get; set; }
        public User User { get; set; }

        public int CryptidId { get; set; }
        public Cryptid Cryptid { get; set; }
    }
}
