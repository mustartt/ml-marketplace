
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
public class Models {
    @Id @GeneratedValue
    private Long id;

    private String name;
    private String category;
    private String framework;
    private String format;
    private String type;
    private int publisher;
    private String description;
    private String descriptionFull;
    private String storageUrl;
    private String  tags;
    private double price;

    private Date createDate;
    private Date updateDate;

    public Models(String name, String category, String type, int publisher) {
        this.name = name;
        this.category = category;
        this.type = type;
        this.publisher = publisher;
        this.createDate = new Date();
    }

    public Models() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof Models))
            return false;
        Models m = (Models) o;
        return this.id.equals(m.id);
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }
}


