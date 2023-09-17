import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import { FormEvent } from "react";
import { z } from "astro/zod";

const Plant = z.object({
  name: z.string(),
  quantity: z.number(),
  category: z.string(),
  description: z.string(),
});

type Plant = z.infer<typeof Plant>;

export function AddPlantForm() {
  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // TODO: this feels hacky, there must be another way to do it
    const plant = Object.fromEntries(formData.entries()) as unknown as Plant;
    console.log("form data", plant);
  }

  return (
    <form method="post" onSubmit={handleOnSubmit}>
      <Stack spacing={2}>
        <label htmlFor="name">Name</label>
        <Input id="name" name="name" type="text" />

        <label htmlFor="quantity">Quantity</label>
        <Input id="quantity" name="quantity" type="numeric" />

        <label htmlFor="category">Category</label>
        <Select name="category" placeholder="Choose one…" id="category">
          <Option value="vegetable">Vegetable</Option>
          <Option value="flower">Flower</Option>
          <Option value="herb">Herb</Option>
          <Option value="fruit">Fruit</Option>
        </Select>

        <label htmlFor="description">Description</label>
        <Textarea name="description" minRows={4} />

        <Button type="submit">Add</Button>
      </Stack>
    </form>
  );
}
