package licenta.service.implementation;

import licenta.entity.Contact;
import licenta.repo.ContactRepository;
import licenta.service.ContactService;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class ContactServiceImpl implements ContactService {
    private final ContactRepository contactRepository;

    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public Contact submitFormContact(Contact contact) {
        contact.setPostedDate(LocalDateTime.now());
        return this.contactRepository.save(contact);
    }
}
