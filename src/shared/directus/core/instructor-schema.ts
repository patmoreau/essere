import type { Instructor } from '../../../contact/core/instructor.ts';

export type InstructorSchema = {
  id: string;
  name: string;
  title?: string | null;
  picture: string;
  description: string;
};

const toInstructor = (schema: InstructorSchema): Instructor => ({
  id: schema.id,
  name: schema.name,
  title: schema.title ?? null,
  pictureUrl: schema.picture,
  description: schema.description,
});

export const InstructorSchema = { toInstructor } as const;
