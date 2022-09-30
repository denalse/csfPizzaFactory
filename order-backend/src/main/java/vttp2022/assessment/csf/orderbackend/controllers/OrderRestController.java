package vttp2022.assessment.csf.orderbackend.controllers;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022.assessment.csf.orderbackend.services.OrderService;
import vttp2022.assessment.csf.orderbackend.models.Order;

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
    public ResponseEntity<String> getOrders(){

        return ResponseEntity.status(HttpStatus.OK).build();    
    }

}
