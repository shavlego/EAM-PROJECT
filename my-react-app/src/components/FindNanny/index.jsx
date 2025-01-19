import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase";
import Header from "../Header";
import Footer from "../Footer";
import "./index.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

function FindNanny() {
  const navigate = useNavigate();
  const [nannies, setNannies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [region, setRegion] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [specialty, setSpecialty] = useState("");

  const citiesInGreece = [
    "Αθήνα",
    "Θεσσαλονίκη",
    "Πάτρα",
    "Ηράκλειο",
    "Λάρισα",
    "Βόλος",
    "Ιωάννινα",
    "Χανιά",
    "Καβάλα",
    "Ρόδος",
  ];

  useEffect(() => {
    fetchNannies();
  }, [region, employmentType, specialty]);

  const fetchNannies = async () => {
    setLoading(true);
    try {
      let q = query(
        collection(FIREBASE_DB, "user"),
        where("role", "==", false)
      );

      if (region) q = query(q, where("region", "==", region));
      if (employmentType) q = query(q, where("type", "==", employmentType));
      if (specialty !== "")
        q = query(q, where("expertise", "==", specialty === "true"));

      const querySnapshot = await getDocs(q);
      const fetchedNannies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNannies(fetchedNannies);
    } catch (err) {
      console.error("Error fetching nannies:", err);
      setError("Failed to fetch nannies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderAvailability = (availability) => {
    return availability?.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((available, colIndex) => (
          <td
            key={colIndex}
            className={available ? "bg-success" : "bg-light"}
          ></td>
        ))}
      </tr>
    ));
  };

  const renderNannies = () => {
    if (nannies.length === 0) {
      return (
        <p className="text-center text-warning">
          Δεν βρέθηκαν νταντάδες με τα επιλεγμένα φίλτρα.
        </p>
      );
    }

    return nannies.map((nanny) => (
      <Col md={6} key={nanny.id} className="mb-4">
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
                  <p className="mt-2">
                    {nanny.expertise ? "Επαγγελματίας" : "Φοιτήτρια"}
                  </p>
                  <p className="mt-2">{nanny.region}</p>
                </div>
              </Col>
              <Col md={8}>
                <Card.Title>{nanny.fullName}</Card.Title>
                <Card.Text>{nanny.bio}</Card.Text>
                <p>
                  <strong>Βαθμολογία:</strong>{" "}
                  {nanny.rating?.toFixed(1) || "N/A"} ⭐
                </p>
                <p>
                  <strong>Τύπος Απασχόλησης:</strong> {nanny.type || "N/A"}
                </p>
                <Button
                variant="primary"
                onClick={() => navigate(`../scheduleAppointment/${nanny.id}`)}
                  >
                    Προγραμματισμός Ραντεβού
                </Button>
                <Button
                variant="success "
                onClick={() => navigate(`../applyForNanny/${nanny.id}`)}
                  >
                    Αίτηση συνεργασίας
                </Button>
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
              <tbody>{renderAvailability(nanny.availability || [])}</tbody>
            </Table>
          </Card.Footer>
        </Card>
      </Col>
    ));
  };

  return (
    <div>
      <Header />
      <Breadcrumb />
      <Container>
        <h1 className="text-center my-4">Αναζήτηση Νταντάδων</h1>
        <p className="text-center">
          Βρες την ιδανική νταντά για εσένα και το παιδί σου. Χρησιμοποίησε τα
          φίλτρα, εντόπισε τον κατάλληλο επαγγελματία και ολοκλήρωσε την αίτηση
          συνεργασίας.
        </p>
        <Row className="mb-4">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Επέλεξε την περιοχή σου</Form.Label>
              <Form.Select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              >
                <option value="" disabled>
                  Επιλέξτε την πόλη σας
                </option>
                {citiesInGreece.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Είδος απασχόλησης</Form.Label>
              <Form.Select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
              >
                <option value="">Όλα</option>
                <option value="Πλήρης">Πλήρης</option>
                <option value="Μερική">Μερική</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Είδος επαγγελματία</Form.Label>
              <Form.Select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="">Όλα</option>
                <option value="true">Επαγγελματίας</option>
                <option value="false">Φοιτήτρια</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={fetchNannies}>
          Αναζήτηση
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setRegion("");
            setEmploymentType("");
            setSpecialty("");
            fetchNannies();
          }}
          className="ms-2"
        >
          Clear Filters
        </Button>

        {loading ? (
          <p className="text-center">Φόρτωση δεδομένων...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : (
          <Row>{renderNannies()}</Row>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default FindNanny;
