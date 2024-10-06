namespace GamePlan.Api.Db.DTOs
{
    public class UpdateActivityDto
    {
        public string Name { get; set; }
        public int Xp { get; set; }
        public DateTime Date { get; set; }
        public bool Completed { get; set; }
    }
}
