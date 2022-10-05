package vttp2022.assessment.csf.orderbackend.controllers;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022.assessment.csf.orderbackend.services.OrderService;
import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;

@RestController
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderRestController {

    private Logger logger = Logger.getLogger(OrderRestController.class.getName());

    @Autowired
    private OrderService orderSvc;

    @PostMapping(path = "/order" ,consumes = MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity<Order> getOrder(@RequestBody String payload) {

        JsonObject object;

        try(InputStream is = new ByteArrayInputStream(payload.getBytes())) {
            JsonReader read = Json.createReader(is);
            object = read.readObject();         
            orderSvc.createOrder(Order.populate((SqlRowSet) object));

        } catch (Exception ex) {
            // ex.getStackTrace();
            object = Json.createObjectBuilder()
                .add("error", ex.getMessage())
                .build();
        }

        
        logger.info("Payload: %s".formatted(payload));

        return ResponseEntity.status(HttpStatus.OK).build();    
    }

    @GetMapping(path="/order/{email}/all")
    public ResponseEntity<String> getOrdersByEmail(@PathVariable String email) {

        List<OrderSummary> orderSummaries = orderSvc.getOrdersByEmail(email);
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (OrderSummary orderSummary: orderSummaries)
            arrBuilder.add(orderSummary.toJson());

        return ResponseEntity.status(HttpStatus.OK).build();    
    }

}
