namespace GamePlan.Api.Db.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public int? Xp { get; set; }
        public int? Level { get; set; }
        public List<Activity>? Activites { get; set; } = new List<Activity>();
        public List<Note> Notes { get; set; } = new List<Note>();
    }
}
