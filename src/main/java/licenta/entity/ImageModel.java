package licenta.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "image_model")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String type;
    @Column(length = 50000000)
    private byte[] picByte;

    public ImageModel(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }
}
