package licenta.controller;

import licenta.entity.Contact;
import licenta.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
@CrossOrigin("*")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Contact submitContactForm(@RequestBody Contact contact) {
        return this.contactService.submitFormContact(contact);
    }
}
