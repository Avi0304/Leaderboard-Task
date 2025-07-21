import { Chip, Avatar, Tooltip } from "@mui/material";
import {
  TrendingUp,
  EmojiEvents,
  MilitaryTech,
  EmojiEmotions,
} from "@mui/icons-material";

export function UserRankItem({ user, isNew = false }) {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <EmojiEvents fontSize="small" className="text-yellow-500" />;
      case 2:
        return <MilitaryTech fontSize="small" className="text-gray-400" />;
      case 3:
        return <EmojiEmotions fontSize="small" className="text-amber-500" />;
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">#{rank}</span>
          </div>
        );
    }
  };

  const getRankStyles = (rank) => {
    switch (rank) {
      case 1:
        return {
          container:
            "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white shadow-2xl border-yellow-300",
          glow: "shadow-yellow-400/50",
        };
      case 2:
        return {
          container:
            "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-white shadow-xl border-gray-300",
          glow: "shadow-gray-400/50",
        };
      case 3:
        return {
          container:
            "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white shadow-xl border-amber-300",
          glow: "shadow-amber-400/50",
        };
      default:
        return {
          container:
            "bg-white hover:bg-gray-50 border-gray-200 shadow-md hover:shadow-lg",
          glow: "",
        };
    }
  };

  const styles = getRankStyles(user.rank);
  

  return (
    <div
      className={`relative p-4 rounded-xl border-2 transition-all duration-500 transform hover:scale-[1.02] 
        ${styles.container} ${styles.glow} ${isNew ? "animate-pulse" : ""}
      `}
    >
      {user.rank <= 3 && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            {getRankIcon(user.rank)}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {user.rank > 3 && getRankIcon(user.rank)}

          <Tooltip title={user.name} arrow>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                fontWeight: "bold",
                background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>

          <div>
            <h3
              className={`font-bold text-lg ${
                user.rank <= 3 ? "text-white" : "text-gray-900"
              }`}
            >
              {user.name}
            </h3>

            <div className="flex items-center gap-2 mt-1">
              <Chip
                label={`Rank #${user.rank}`}
                size="small"
                variant={user.rank <= 3 ? "filled" : "outlined"}
                sx={{
                  backgroundColor:
                    user.rank <= 3 ? "rgba(255,255,255,0.2)" : undefined,
                  color: user.rank <= 3 ? "#fff" : undefined,
                  borderColor:
                    user.rank <= 3 ? "rgba(255,255,255,0.3)" : undefined,
                }}
              />
              {isNew && (
                <Chip
                  label="New!"
                  color="error"
                  size="small"
                  icon={<TrendingUp fontSize="small" />}
                  className="animate-bounce"
                />
              )}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`text-3xl font-bold ${
              user.rank <= 3 ? "text-white" : "text-gray-900"
            }`}
          >
            {user.totalPoints}
          </div>
          <div
            className={`text-sm ${
              user.rank <= 3 ? "text-white/80" : "text-gray-500"
            }`}
          >
            points
          </div>
        </div>
      </div>
    </div>
  );
}
