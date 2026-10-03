import { useEffect, useRef, useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";

import API from "../services/api";

const Profile = () => {
  const imageInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    bio: "",
    skills: "",
    education: "",
    experience: "",
    portfolio: "",
    github: "",
    linkedin: "",
  });

  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
  |--------------------------------------------------------------------------
  | FETCH PROFILE
  |--------------------------------------------------------------------------
  */

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/student/profile");

      if (response.data.success) {
        const student = response.data.student;

        setProfile(student);

        setFormData({
          name: student.name || "",
          email: student.email || "",
          phone: student.phone || "",
          location: student.location || "",
          headline: student.headline || "",
          bio: student.bio || "",
          skills: Array.isArray(student.skills)
            ? student.skills.join(", ")
            : "",
          education: student.education || "",
          experience: student.experience || "",
          portfolio: student.portfolio || "",
          github: student.github || "",
          linkedin: student.linkedin || "",
        });
      }
    } catch (err) {
      console.error("Profile fetch error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | SAVE PROFILE
  |--------------------------------------------------------------------------
  */

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...formData,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await API.put(
        "/student/profile",
        payload
      );

      if (response.data.success) {
        const student = response.data.student;

        setProfile(student);

        setFormData({
          name: student.name || "",
          email: student.email || "",
          phone: student.phone || "",
          location: student.location || "",
          headline: student.headline || "",
          bio: student.bio || "",
          skills: Array.isArray(student.skills)
            ? student.skills.join(", ")
            : "",
          education: student.education || "",
          experience: student.experience || "",
          portfolio: student.portfolio || "",
          github: student.github || "",
          linkedin: student.linkedin || "",
        });

        setEditing(false);
        setSuccess("Profile updated successfully.");

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }
    } catch (err) {
      console.error("Profile update error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | CANCEL EDIT
  |--------------------------------------------------------------------------
  */

  const handleCancel = () => {
    if (!profile) return;

    setFormData({
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      location: profile.location || "",
      headline: profile.headline || "",
      bio: profile.bio || "",
      skills: Array.isArray(profile.skills)
        ? profile.skills.join(", ")
        : "",
      education: profile.education || "",
      experience: profile.experience || "",
      portfolio: profile.portfolio || "",
      github: profile.github || "",
      linkedin: profile.linkedin || "",
    });

    setEditing(false);
    setError("");
  };

  /*
  |--------------------------------------------------------------------------
  | PROFILE IMAGE
  |--------------------------------------------------------------------------
  */

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadingImage(true);
      setError("");
      setSuccess("");

      const data = new FormData();

      data.append("profileImage", file);

      const response = await API.post(
        "/student/profile/image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setProfile(response.data.student);

        setSuccess(
          "Profile image uploaded successfully."
        );

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }
    } catch (err) {
      console.error("Image upload error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to upload profile image."
      );
    } finally {
      setUploadingImage(false);

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  /*
  |--------------------------------------------------------------------------
  | RESUME UPLOAD
  |--------------------------------------------------------------------------
  */

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadingResume(true);
      setError("");
      setSuccess("");

      const data = new FormData();

      data.append("resume", file);

      const response = await API.post(
        "/student/profile/resume",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setProfile(response.data.student);

        setSuccess(
          "Resume uploaded successfully."
        );

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }
    } catch (err) {
      console.error("Resume upload error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to upload resume."
      );
    } finally {
      setUploadingResume(false);

      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PROFILE NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!profile) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">
          {error || "Profile not found."}
        </Alert>
      </Container>
    );
  }

  const avatarLetter =
    profile.name?.charAt(0)?.toUpperCase() || "S";

  const displaySkills = Array.isArray(profile.skills)
    ? profile.skills
    : [];

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#F8FAFC 0%,#EEF4FF 100%)",
        py: {
          xs: 3,
          md: 6,
        },
      }}
    >
      <Container maxWidth="xl">
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setSuccess("")}
          >
            {success}
          </Alert>
        )}

        {/* HEADER */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 5,
            },
            borderRadius: 5,
            background: "#fff",
            boxShadow:
              "0 15px 40px rgba(15,23,42,.06)",
          }}
        >
          <Grid
            container
            spacing={4}
            alignItems="center"
          >
            {/* IMAGE */}

            <Grid item xs={12} md={3}>
              <Stack alignItems="center" spacing={2}>
                <Avatar
                  src={
                    profile.profileImage || undefined
                  }
                  sx={{
                    width: {
                      xs: 120,
                      md: 150,
                    },
                    height: {
                      xs: 120,
                      md: 150,
                    },
                    fontSize: 48,
                    fontWeight: 900,
                    background:
                      "linear-gradient(135deg,#2563EB,#7C3AED)",
                  }}
                >
                  {!profile.profileImage &&
                    avatarLetter}
                </Avatar>

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  hidden
                  onChange={handleImageUpload}
                />

                <Button
                  variant="outlined"
                  startIcon={
                    uploadingImage ? (
                      <CircularProgress size={18} />
                    ) : (
                      <PhotoCameraRoundedIcon />
                    )
                  }
                  onClick={() =>
                    imageInputRef.current?.click()
                  }
                  disabled={uploadingImage}
                  sx={{
                    borderRadius: 3,
                  }}
                >
                  {uploadingImage
                    ? "Uploading..."
                    : "Change Photo"}
                </Button>
              </Stack>
            </Grid>

            {/* BASIC INFORMATION */}

            <Grid item xs={12} md={6}>
              {editing ? (
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    label="Professional Headline"
                    name="headline"
                    value={formData.headline}
                    onChange={handleChange}
                    placeholder="Frontend Developer | React Developer"
                  />
                </Stack>
              ) : (
                <>
                  <Typography
                    fontWeight={900}
                    fontSize={{
                      xs: "1.8rem",
                      md: "2.5rem",
                    }}
                  >
                    {profile.name}
                  </Typography>

                  <Typography
                    color="primary"
                    fontWeight={700}
                    sx={{ mt: 1 }}
                  >
                    {profile.headline ||
                      "Student"}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {profile.email}
                  </Typography>

                  {profile.location && (
                    <Typography
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      📍 {profile.location}
                    </Typography>
                  )}

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mt: 2 }}
                  >
                    {displaySkills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </>
              )}
            </Grid>

            {/* ACTIONS */}

            <Grid item xs={12} md={3}>
              {editing ? (
                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={
                      saving ? (
                        <CircularProgress
                          size={18}
                          color="inherit"
                        />
                      ) : (
                        <SaveRoundedIcon />
                      )
                    }
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                      borderRadius: 3,
                      py: 1.3,
                    }}
                  >
                    {saving
                      ? "Saving..."
                      : "Save Profile"}
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={
                      <CancelRoundedIcon />
                    }
                    onClick={handleCancel}
                    disabled={saving}
                    sx={{
                      borderRadius: 3,
                      py: 1.3,
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EditRoundedIcon />}
                  onClick={() => {
                    setEditing(true);
                    setError("");
                  }}
                  sx={{
                    borderRadius: 3,
                    py: 1.3,
                  }}
                >
                  Edit Profile
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>

        {/* ABOUT + CONTACT */}

        <Grid
          container
          spacing={4}
          sx={{ mt: 1 }}
        >
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 5,
                boxShadow:
                  "0 15px 40px rgba(15,23,42,.06)",
              }}
            >
              <Typography
                fontWeight={800}
                fontSize="1.4rem"
                mb={2}
              >
                About Me
              </Typography>

              {editing ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  label="About Me"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              ) : (
                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.9,
                  }}
                >
                  {profile.bio ||
                    "Complete your profile with a short introduction about yourself, your skills and career goals."}
                </Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 5,
                boxShadow:
                  "0 15px 40px rgba(15,23,42,.06)",
              }}
            >
              <Typography
                fontWeight={800}
                fontSize="1.4rem"
                mb={3}
              >
                Account Information
              </Typography>

              <Stack spacing={2.5}>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Email
                  </Typography>

                  <Typography fontWeight={700}>
                    {profile.email}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Phone
                  </Typography>

                  <Typography fontWeight={700}>
                    {profile.phone || "Not added"}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Account Role
                  </Typography>

                  <Typography fontWeight={700}>
                    {profile.role}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={0.7}
                  >
                    Email Verification
                  </Typography>

                  <Chip
                    size="small"
                    label={
                      profile.isVerified
                        ? "Verified"
                        : "Not Verified"
                    }
                    color={
                      profile.isVerified
                        ? "success"
                        : "warning"
                    }
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* EDIT PROFILE DETAILS */}

        {editing && (
          <Paper
            elevation={0}
            sx={{
              mt: 4,
              p: 4,
              borderRadius: 5,
              boxShadow:
                "0 15px 40px rgba(15,23,42,.06)",
            }}
          >
            <Typography
              fontWeight={800}
              fontSize="1.4rem"
              mb={3}
            >
              Professional Information
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  helperText="Separate skills using commas"
                  placeholder="React, Node.js, MongoDB"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="B.Tech Computer Science"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Describe your experience..."
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Portfolio URL"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="GitHub URL"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="LinkedIn URL"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* RESUME */}

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: {
              xs: 3,
              md: 4,
            },
            borderRadius: 5,
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            color: "#fff",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              md: "center",
            }}
            spacing={3}
          >
            <Box>
              <Typography
                fontWeight={800}
                fontSize="1.6rem"
              >
                Resume
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,.7)",
                  mt: 1,
                }}
              >
                {profile.resume
                  ? "Your resume is uploaded and ready."
                  : "Upload your resume for job applications and ATS analysis."}
              </Typography>
            </Box>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              width={{
                xs: "100%",
                md: "auto",
              }}
            >
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={handleResumeUpload}
              />

              <Button
                variant="contained"
                startIcon={
                  uploadingResume ? (
                    <CircularProgress
                      size={18}
                      color="inherit"
                    />
                  ) : (
                    <UploadRoundedIcon />
                  )
                }
                onClick={() =>
                  resumeInputRef.current?.click()
                }
                disabled={uploadingResume}
                sx={{
                  borderRadius: 3,
                  whiteSpace: "nowrap",
                }}
              >
                {uploadingResume
                  ? "Uploading..."
                  : profile.resume
                  ? "Replace Resume"
                  : "Upload Resume"}
              </Button>

              {profile.resume && (
                <Button
                  variant="outlined"
                  component="a"
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={
                    <DownloadRoundedIcon />
                  }
                  sx={{
                    borderRadius: 3,
                    color: "#fff",
                    borderColor:
                      "rgba(255,255,255,.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  View Resume
                </Button>
              )}
            </Stack>
          </Stack>
        </Paper>

        {/* LINKS */}

        {(profile.portfolio ||
          profile.github ||
          profile.linkedin) && (
          <Paper
            elevation={0}
            sx={{
              mt: 4,
              p: 4,
              borderRadius: 5,
              boxShadow:
                "0 15px 40px rgba(15,23,42,.06)",
            }}
          >
            <Typography
              fontWeight={800}
              fontSize="1.4rem"
              mb={3}
            >
              Portfolio & Social Links
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              {profile.portfolio && (
                <Button
                  component="a"
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={
                    <LinkRoundedIcon />
                  }
                  sx={{ borderRadius: 3 }}
                >
                  Portfolio
                </Button>
              )}

              {profile.github && (
                <Button
                  component="a"
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={
                    <LinkRoundedIcon />
                  }
                  sx={{ borderRadius: 3 }}
                >
                  GitHub
                </Button>
              )}

              {profile.linkedin && (
                <Button
                  component="a"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={
                    <LinkRoundedIcon />
                  }
                  sx={{ borderRadius: 3 }}
                >
                  LinkedIn
                </Button>
              )}
            </Stack>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Profile;