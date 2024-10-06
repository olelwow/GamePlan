using System.Text.Json.Serialization;

namespace GamePlan.Api.Db.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Xp { get; set; }
        public bool Completed { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
    }
}
