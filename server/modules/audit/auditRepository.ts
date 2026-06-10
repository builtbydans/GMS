const supabase = require("../../config/db/supabase");
const AppError = require("../../errors/AppError");

const createAuditLog = async (auditData: any) => {
  const { data, error } = await supabase
    .from("audit_logs")
    .insert(auditData)
    .select()
    .single();

  if (error) {
    throw new AppError(error.message);
  }

  return data;
};

module.exports = {
  createAuditLog,
};
