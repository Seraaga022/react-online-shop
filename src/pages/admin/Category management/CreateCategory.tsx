import {
  Box,
  Button,
  Container,
  Input,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Theme from "../../../theme/Theme";
import CustomButton from "../../../theme/Products/ProductsButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateCategoryInputT } from "../../../utils/types/CategoryManagement";
import React from "react";
import { useUploadFile } from "../../../hooks/useAuth";
import { fileUploadResT } from "../../../utils/types/Auth";
import { useCreateCategory } from "../../../hooks/useCategoryManagement";
import { productCategoryT } from "../../../utils/types/Product";

const CreateCategory = () => {
  const appTheme = Theme();
  const uploadFile = useUploadFile(uploadImageSucced);
  const createCategory = useCreateCategory(categoryCreatedSuccessfully);
  const [categoryImage, setCategoryImage] = React.useState<Blob>();
  const [categoryImageError, setCategoryImageError] = React.useState<
    string | null
  >(null);
  const [formData, setFormData] = React.useState<CreateCategoryInputT>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryInputT>();
  const onSubmit: SubmitHandler<CreateCategoryInputT> = (data) => {
    if (categoryImage) {
      uploadFile.mutateAsync(categoryImage);
      setFormData(data);
    } else setCategoryImageError("this field is required");
  };

  function uploadImageSucced(res: fileUploadResT) {
    if (formData)
      createCategory.mutateAsync({ ...formData, image: res.location });
  }
  function categoryCreatedSuccessfully(res: productCategoryT) {
    console.log(res);
  }

  return (
    <Box
      bgcolor={appTheme === "dark" ? "#141414" : "#fff"}
      color={appTheme === "dark" ? "#fff" : "#000"}
      pt="20px"
      minHeight="300px"
    >
      <Container maxWidth="md">
        <Box>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Container maxWidth="md">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <Box>
                    <Box display="flex" gap="10px">
                      <Typography
                        fontSize="17px"
                        color={appTheme === "dark" ? "#fff" : "#000"}
                      >
                        Name
                      </Typography>
                      <Box>
                        {errors.name && (
                          <Box
                            component="span"
                            color="orange"
                            sx={{ opacity: "80%" }}
                          >
                            {errors.name.message}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Box>
                          <TextField
                            {...register("name", { required: true })}
                            sx={{
                              width: "100%",
                              borderRadius: "10px",
                              bgcolor:
                                appTheme === "dark" ? "#141414" : "#f3f3f3",
                              "& .MuiInputBase-input": {
                                color: appTheme === "dark" ? "white" : "#000",
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid",
                                borderRadius: "10px",
                                borderColor:
                                  appTheme === "dark" ? "#262626" : "#d1d5db",
                                mb: "1px",
                              },
                              "&:hover:not(.Mui-focused)": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid #703bf7",
                                  borderRadius: "10px",
                                },
                              },
                              "& .Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid #703bf7",
                                  borderRadius: "10px",
                                },
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box display="flex" gap="10px">
                      <Typography
                        fontSize="17px"
                        color={appTheme === "dark" ? "#fff" : "#000"}
                      >
                        Image
                      </Typography>
                      <Box>
                        {categoryImageError && (
                          <Box
                            component="span"
                            color="orange"
                            sx={{ opacity: "80%" }}
                          >
                            {categoryImageError}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Box>
                          <Input
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setCategoryImageError(null);
                              setCategoryImage(e.target.files?.[0]);
                            }}
                            type="file"
                            required
                            sx={{
                              width: "100%",
                              p: "10px",
                              borderRadius: "10px 10px 0 0",
                              borderInline: "1px solid",
                              borderTop: "1px solid",
                              borderColor:
                                appTheme === "dark" ? "#262626" : "#d1d5db",
                              backgroundColor:
                                appTheme === "dark" ? "#141414" : "#f3f3f3",
                              "& .MuiInputBase-input": {
                                color: appTheme === "dark" ? "white" : "#000",
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* submit button */}
                  <Box py="40px">
                    <Box display="flex" alignItems="center">
                      <Box>
                        <ThemeProvider theme={CustomButton}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth={false}
                            sx={{
                              "&.MuiButtonBase-root": {
                                minWidth: "10px",
                                width: { xs: "200px", sm: "300px" },
                                height: "50px",
                                borderRadius: "8px",
                              },
                              textTransform: "none",
                            }}
                          >
                            <Box>Create</Box>
                          </Button>
                        </ThemeProvider>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </form>
            </Container>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateCategory;
