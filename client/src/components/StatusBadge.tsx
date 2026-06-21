import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const getVariant = (status: string) => {
  switch (status) {
    case "LEAD":
      return "secondary";

    case "QUOTED":
      return "outline";

    case "BOOKED":
      return "default";

    case "IN_PROGRESS":
      return "default";

    case "COMPLETED":
      return "default";

    case "INVOICED":
      return "outline";

    case "PAID":
      return "default";

    case "LOST":
      return "destructive";

    default:
      return "outline";
  }
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <Badge variant={getVariant(status)}>{status}</Badge>;
};

export default StatusBadge;
