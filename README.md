# ktu-didvyriai

## DB schema

```mermaid
classDiagram

    Event <|-- Ticket
    Ticket <|-- User

    class Event {
        uuid ID
        String EventName
        int TotalSeatAmount
        int FreeSeatsLeft
        String Location
        DateTime Date
        bool IsAgeRestricted
        int MinimumAge
    }

    class Ticket {
        uuid ID 
        DateTime DateOfSale
    }

    class User {
        uuid ID
        String Nickname
        String Password
        String Email
        String Name
        String Surname
        DateTime DateOfBirth
    }
```