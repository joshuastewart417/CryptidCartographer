using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CryptidCartographer.Models
{
    public class Cryptid
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        public DateTime DateCreated { get; set; }

        public int UserId { get; set; }
        public User User { get; set;}

        public int StateId { get; set; }
        public State State { get; set; }

        public List<Classification> Classifications { get; internal set; }

    }
}
