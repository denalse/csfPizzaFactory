package vttp2022.assessment.csf.orderbackend.services;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import static vttp2022.assessment.csf.orderbackend.repositories.Queries.*;

@Service
public class OrderService {

	@Autowired
    private JdbcTemplate temp;
	

	// POST /api/order
	// Create a new order by inserting into orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature

	public void createOrder(Order order) {
		int added = temp.update(SQL_INSERT_ORDER, order.getEmail(), order.getSize(),
					order.isThickCrust(), order.getSauce(), order.getToppings(), order.getComments());
					System.out.printf(">>>>> ADDED: %d\n", added);

	}

	// GET /api/order/<email>/all
	// Get a list of orders for email from orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public List<OrderSummary> getOrdersByEmail(String email) {
		// Use priceSvc to calculate the total cost of an order
		List<OrderSummary> list = new LinkedList<>();
		SqlRowSet rs = temp.queryForRowSet(SQL_GET_ORDERS_BY_EMAIL, email);
        while (rs.next()){
            OrderSummary order = new OrderSummary();
            list.add(order);
        }
        System.out.println("Here are the order list: " + list);
        return list;

	}
}
