using System.ComponentModel.DataAnnotations;

namespace RestaurantAPI.Models
{
    public class OrderDetail
    {
        [Key]
        public long OrderDetailId { get; set; }

        public long OrderMasterId { get; set; }
        


        public int FoodItemId { get; set; }
        public FoodItem FoodItem { get; set; }
        /* Foreign Key refrenced from the FoodItem Table's Primary Key*/


        public decimal FoodItemPrice { get; set; }


        public int Quantity { get; set; }
    }
}
