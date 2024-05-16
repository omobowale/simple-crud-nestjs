export const getResponseData = (
  isError: boolean,
  data: any = null,
  message: string,
) => {
  const response = { message, success: !isError, data };
  return response;
};
