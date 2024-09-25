namespace GamePlan.Api.Db.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Xp { get; set; }
        public DateTime Date { get; set; }
        public List<User>? User { get; set; } = new List<User>();
    }
}
