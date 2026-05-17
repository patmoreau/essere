import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import { useDirectus } from "../../shared/directus/core/use-directus.ts";
import type { Event } from "../core/event.ts";
import { useEventsPage } from "../core/use-events-page.ts";

type Props = {
  open: boolean;
  event: Event;
  onClose: () => void;
};

type FormErrors = {
  fullName: string;
  email: string;
};

const EventRegistrationModal = ({ open, event, onClose }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const directus = useDirectus();
  const eventsPage = useEventsPage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({ fullName: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = { fullName: "", email: "" };
    if (!fullName.trim()) next.fullName = eventsPage.registerFullNameError;
    if (!email.trim()) next.email = eventsPage.registerEmailRequiredError;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = eventsPage.registerEmailInvalidError;
    setErrors(next);
    return !next.fullName && !next.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await directus.submitRegistration({
        name: fullName.trim(),
        email: email.trim(),
        event: event.title,
        deposit: event.deposit ?? "",
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    setFullName("");
    setEmail("");
    setErrors({ fullName: "", email: "" });
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : "var(--radius-xl)",
          bgcolor: "var(--background)",
          boxShadow: "0px 24px 64px rgba(46, 52, 45, 0.12)",
        },
      }}
    >
      <DialogTitle sx={{ p: { xs: 3, md: 4 }, pb: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              component="p"
              sx={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--primary)",
                mb: 0.5,
              }}
            >
              {eventsPage.registerEyebrow}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily: "Noto Serif, serif",
                fontSize: { xs: "1.375rem", md: "1.75rem" },
                fontWeight: 400,
                color: "var(--on-background)",
              }}
            >
              {event.title}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            aria-label={eventsPage.registerCloseLabel}
            sx={{ mt: 0.5, color: "var(--on-surface-variant)" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 3, md: 4 } }}>
        {submitted ? (
          <Box sx={{ textAlign: "center", py: { xs: 4, md: 6 } }}>
            <CheckCircleOutlineIcon
              sx={{ fontSize: "3.5rem", color: "var(--primary)", mb: 2 }}
            />
            <Typography
              component="h3"
              sx={{
                fontFamily: "Noto Serif, serif",
                fontSize: "1.5rem",
                fontWeight: 400,
                color: "var(--on-background)",
                mb: 1.5,
              }}
            >
              {eventsPage.confirmHeadline}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Manrope, sans-serif",
                color: "var(--on-surface-variant)",
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              {eventsPage.confirmBodyBeforeName} {fullName.trim().split(" ")[0]}
              {eventsPage.confirmBodyBeforeEmail}{" "}
              <Box
                component="span"
                sx={{ fontWeight: 700, color: "var(--on-surface)" }}
              >
                {email}
              </Box>{" "}
              {eventsPage.confirmBodyAfterEmail}
            </Typography>
            <Button
              onClick={handleClose}
              sx={{
                background:
                  "linear-gradient(135deg, var(--primary), var(--primary-dim))",
                color: "var(--on-primary)",
                borderRadius: "9999px",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                py: 1.5,
                px: 4,
                fontSize: "0.9375rem",
                textTransform: "none",
                transition: "all 300ms ease-out",
                "&:hover": { opacity: 0.9 },
              }}
            >
              {eventsPage.confirmCloseLabel}
            </Button>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              label={eventsPage.registerFullNameLabel}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
              required
              autoComplete="name"
              sx={{ mb: 3 }}
            />
            <TextField
              label={eventsPage.registerEmailLabel}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
              autoComplete="email"
              sx={{ mb: 4 }}
            />
            <Button
              type="submit"
              fullWidth
              disabled={submitting}
              sx={{
                background:
                  "linear-gradient(135deg, var(--primary), var(--primary-dim))",
                color: "var(--on-primary)",
                borderRadius: "9999px",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                py: 1.75,
                fontSize: "0.9375rem",
                textTransform: "none",
                transition: "all 300ms ease-out",
                "&:hover": { opacity: 0.9, transform: "translateY(-1px)" },
              }}
            >
              {eventsPage.registerSubmitLabel}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationModal;
