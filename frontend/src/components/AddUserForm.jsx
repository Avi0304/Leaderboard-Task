import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";
import { LuUserPlus, LuCheck } from "react-icons/lu";
import { toast, Bounce } from 'react-toastify';


const AddUserForm = ({ onAddUser }) => {
  const [newUserName, setNewUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;

    setIsLoading(true);
    await onAddUser(newUserName.trim());
    setNewUserName("");
    setIsLoading(false);
    setIsSuccess(true);
    toast.success('Add User Succussfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        px: 3,
        py: 4,
        borderRadius: 3,
        background: "linear-gradient(to bottom right, #e0f7fa, #e8f5e9)",
      }}
    >
      <Stack spacing={2} alignItems="flex-start">
        <Box display="flex" alignItems="center" gap={1}>
          <LuUserPlus color="#2e7d32" />
          <Typography variant="h6" fontWeight="600">
            Add New User
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Expand your leaderboard with new participants
        </Typography>

        <TextField
          fullWidth
          label="User Name"
          variant="outlined"
          size="medium"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddUser()}
        />


        <Button
          fullWidth
          variant="contained"
          onClick={handleAddUser}
          startIcon={isSuccess ? <LuCheck /> : !isLoading ? <LuUserPlus /> : null}
          disabled={isLoading || isSuccess}
          sx={{
            height: 48,
            color: "white",
            fontWeight: 600,
            fontSize: "1.125rem",
            boxShadow: 3,
            borderRadius: "0.375rem",
            background: "linear-gradient(to right, #22c55e, #10b981)", // from-green-500 to-emerald-500
            transition: "all 0.3s ease",
            '&:hover': {
              background: "linear-gradient(to right, #16a34a, #059669)", // darker on hover
              transform: 'scale(1.02)',
            },
            '&:disabled': {
              opacity: 0.6,
              cursor: 'not-allowed',
              background: "linear-gradient(to right, #22c55e, #10b981)",
            },
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={20} color="inherit" />
              &nbsp;Adding...
            </>
          ) : isSuccess ? (
            "User Added!"
          ) : (
            "Add User"
          )}
        </Button>



      </Stack>
    </Paper>
  );
};

export default AddUserForm;
