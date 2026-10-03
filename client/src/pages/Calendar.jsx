import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import API from "../services/api";

const InterviewCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/calendar/student");

      console.log("Calendar Response Full:");
console.log(response.data);
console.log("Events:", response.data.events);
console.log("Count:", response.data.count);

      setEvents(response?.data?.events || []);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Unable to load calendar events."
      );

      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const isSameDay = (d1, d2) => {
    const a = new Date(d1);
    const b = new Date(d2);

    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  };

  const selectedEvents = useMemo(() => {
    return events.filter(
      (event) =>
        event.date && isSameDay(event.date, date)
    );
  }, [events, date]);

  const tileContent = ({ date: tileDate }) => {
    const hasEvent = events.some(
      (event) =>
        event.date &&
        isSameDay(event.date, tileDate)
    );

    if (!hasEvent) return null;

    return (
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#2563EB",
          mx: "auto",
          mt: 0.5,
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#F8FAFC,#EEF4FF)",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight={900}
          mb={1}
        >
          Interview Calendar
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Track your upcoming interviews and
          events.
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 10,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr",
                },
                gap: 3,
              }}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                }}
              >
                <Calendar
                  value={date}
                  onChange={(value) => {
                    if (
                      value instanceof Date
                    ) {
                      setDate(value);
                    }
                  }}
                  tileContent={tileContent}
                />
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  {date.toDateString()}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {selectedEvents.length} event(s)
                </Typography>

                {selectedEvents.length === 0 ? (
                  <Typography
                    color="text.secondary"
                  >
                    No events scheduled.
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {selectedEvents.map(
                      (event, index) => (
                        <Paper
                          key={
                            event._id || index
                          }
                          sx={{
                            p: 2,
                            background:
                              "#F8FAFC",
                          }}
                        >
                          <Typography
                            fontWeight={700}
                          >
                            {event.title ||
                              "Interview"}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {event.company}
                          </Typography>

                          <Typography
                            variant="body2"
                          >
                            {new Date(
                              event.date
                            ).toLocaleString()}
                          </Typography>
                        </Paper>
                      )
                    )}
                  </Stack>
                )}
              </Paper>
            </Box>

            <Paper
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
              >
                Upcoming Events
              </Typography>

              {events.length === 0 ? (
                <Typography
                  color="text.secondary"
                >
                  No upcoming interviews.
                </Typography>
              ) : (
                <Stack spacing={2}>
                  {events.map(
                    (event, index) => (
                      <Paper
                        key={
                          event._id || index
                        }
                        sx={{
                          p: 2,
                          background:
                            "#F8FAFC",
                        }}
                      >
                        <Typography
                          fontWeight={700}
                        >
                          {event.title ||
                            "Interview"}
                        </Typography>

                        <Typography
                          variant="body2"
                        >
                          {event.company}
                        </Typography>
                      </Paper>
                    )
                  )}
                </Stack>
              )}
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
};

export default InterviewCalendar;