// Gender vocabulary shared by registration, profile settings and tuition posts.
// `value` is what gets stored in the database; `label` is what the user sees.

// Only used by the registration form - gender is a permanent account attribute,
// so Profile Settings displays it read-only rather than offering these options.
export const USER_GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

export const TUTOR_GENDER_PREFERENCE_OPTIONS = [
  { value: "Male", label: "Male Tutor" },
  { value: "Female", label: "Female Tutor" },
  { value: "No Preference", label: "No Preference" },
];

// Posts created before this field existed fall back to "No Preference".
const preferenceOption = (value) =>
  TUTOR_GENDER_PREFERENCE_OPTIONS.find((option) => option.value === value) ||
  TUTOR_GENDER_PREFERENCE_OPTIONS[2];

// Label for a stored preferredTutorGender value (used when displaying a post).
export const tutorGenderPreferenceLabel = (value) => preferenceOption(value).label;
