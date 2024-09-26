namespace GamePlan.Api.Db.DTOs
{
    public class CreateActivityDto
    {
        public string Name { get; set; }
        public int Xp { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
    }
}
