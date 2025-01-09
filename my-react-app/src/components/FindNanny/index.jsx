// Home Page Component
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Table } from "react-bootstrap";



function FindNanny  ()  {



    const nannies = [
    {
        name: "Μαρία Παπανικολάου",
        role: "Επαγγελματίας",
        description:
        "Γεια σας! Είμαι η Μαρία, επαγγελματίας νταντά με 4 χρόνια εμπειρίας στη φροντίδα βρεφών και παιδιών. Είμαι υπεύθυνη, αξιόπιστη και έχω στόχο να σας προσφέρω ένα ασφαλές και χαρούμενο περιβάλλον για τα παιδιά.",
        rating: 4.8,
        availability: [
        [true, true, true, true, true, false, false], // Morning
        [true, true, true, true, true, false, false], // Afternoon
        [false, false, true, true, false, false, false], // Evening
        ],
        employmentType: "Πλήρης απασχόληση",
    },
    {
        name: "Ιωάννα Λαρετζάκη",
        role: "Φοιτήτρια",
        description:
        "Ονομάζομαι Ιωάννα, είμαι φοιτήτρια Παιδαγωγικού Τμήματος με αγάπη για τα παιδιά και μεγάλη διάθεση να υποστηρίξω την ανάπτυξή τους. Είμαι φιλική και εκπαιδευτική στις δραστηριότητές μου.",
        rating: 4.0,
        availability: [
        [true, false, true, true, false, false, false], // Morning
        [true, true, true, true, true, false, false], // Afternoon
        [false, false, true, true, true, false, false], // Evening
        ],
        employmentType: "Μερική απασχόληση",
    },
    ];

    const renderAvailability = (availability) => {
    return availability.map((row, rowIndex) => (
        <tr key={rowIndex}>
        {row.map((available, colIndex) => (
            <td key={colIndex} className={available ? "bg-success" : "bg-light"}></td>
        ))}
        </tr>
    ));
    };    


  
    return (
        <div>
        <Header />
        <Container>
        <h1 className="text-center my-4">Αναζήτηση "Νταντάδων"</h1>
        <p className="text-center">
            Βρες την ιδανική νταντά για εσένα και το παιδί σου. Χρησιμοποίησε τα φίλτρα,
            εντόπισε τον κατάλληλο επαγγελματία και ολοκλήρωσε την αίτηση συνεργασίας.
        </p>
        <Row className="mb-4">
            <Col md={3}>
            <Form.Group>
                <Form.Label>Επέλεξε την περιοχή σου</Form.Label>
                <Form.Control type="text" placeholder="Περιοχή" />
            </Form.Group>
            </Col>
            <Col md={3}>
            <Form.Group>
                <Form.Label>Επέλεξε μέρες</Form.Label>
                <Form.Control type="text" placeholder="Μέρες" />
            </Form.Group>
            </Col>
            <Col md={3}>
            <Form.Group>
                <Form.Label>Είδος απασχόλησης</Form.Label>
                <Form.Select>
                <option>Πλήρης</option>
                <option>Μερική</option>
                </Form.Select>
            </Form.Group>
            </Col>
            <Col md={3}>
            <Form.Group>
                <Form.Label>Ειδικότητα / Όρια ηλικίας</Form.Label>
                <Form.Control type="text" placeholder="Ειδικότητα ή Περιοχή" />
            </Form.Group>
            </Col>
        </Row>
        <Row>
            {nannies.map((nanny, index) => (
            <Col md={6} key={index} className="mb-4">
                <Card>
                <Card.Body>
                    <Row>
                    <Col md={4}>
                        <div className="text-center">
                        <div
                            style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            backgroundColor: "#ddd",
                            margin: "0 auto",
                            }}
                        ></div>
                        <p className="mt-2">{nanny.role}</p>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Card.Title>{nanny.name}</Card.Title>
                        <Card.Text>{nanny.description}</Card.Text>
                        <p>
                        <strong>Βαθμολογία:</strong> {nanny.rating.toFixed(1)} ⭐
                        </p>
                        <p>
                        <strong>Τύπος Απασχόλησης:</strong> {nanny.employmentType}
                        </p>
                        <Button variant="primary">Προγραμματισμός ραντεβού</Button>
                    </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Table bordered className="text-center mb-0">
                    <thead>
                        <tr>
                        <th>Δ</th>
                        <th>Τ</th>
                        <th>Τ</th>
                        <th>Π</th>
                        <th>Π</th>
                        <th>Σ</th>
                        <th>Κ</th>
                        </tr>
                    </thead>
                    <tbody>{renderAvailability(nanny.availability)}</tbody>
                    </Table>
                </Card.Footer>
                </Card>
            </Col>
            ))}
        </Row>
        </Container>
        <Footer />     
        </div>
    );
  }
  

  export default FindNanny;