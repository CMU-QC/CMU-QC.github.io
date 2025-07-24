const { createApp, ref, reactive, computed, onMounted } = Vue;

createApp({
  setup() {
    // Reactive data for your club
    const clubName = ref("CMU QC"); // Changed to CMU QC
    const clubMotto = ref("Advancing the Future, Bit by Qubit.");
    const clubFocus = ref(
      "cutting-edge quantum computing research and education"
    );
    const foundingYear = ref(2023);
    const clubMission = ref(
      "fostering a community of quantum enthusiasts, researchers, and developers to push the boundaries of quantum technology"
    );
    const typicalActivities = ref([
      "quantum hackathons",
      "research seminars",
      "coding workshops",
      "industry speaker events",
    ]);

    // Navigation state
    const currentPage = ref("home"); // 'home', 'events', 'team', 'calendar', 'educational', 'contact'

    // Events data (will be loaded from JSON)
    const allEvents = ref([]); // Store all events
    const currentEventType = ref("upcoming"); // 'upcoming' or 'previous'

    // Team Members data (will be loaded from JSON)
    const teamMembers = ref([]);

    // Educational Resources data (will be loaded from JSON)
    const educationalResources = ref([]); // New ref for educational content

    // Contact information
    const contact = reactive({
      email: "info@cmuqc.org", // Changed to CMU QC email
      phone: "", // Optional
      socialMedia: {
        linkedin: "https://www.linkedin.com/company/cmu-qc", // Placeholder, update if needed
        github: "https://github.com/CMU-QC-Official", // Placeholder, update if needed
        twitter: "https://twitter.com/CMU_QC", // Placeholder, update if needed
      },
    });

    // External "Join Us" link
    const joinUsLink = ref("https://forms.gle/your-cmuqc-join-form-link"); // **IMPORTANT: Replace with your actual Google Form or signup link**

    // Computed property for current year in footer
    const currentYear = computed(() => new Date().getFullYear());

    // Computed property to filter events based on currentEventType
    const filteredEvents = computed(() => {
      return allEvents.value.filter(
        (event) => event.status === currentEventType.value
      );
    });

    // Function to load events from JSON
    const loadEvents = async () => {
      try {
        const response = await fetch("data/events.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        allEvents.value = data; // Store all events
      } catch (error) {
        console.error("Error loading events:", error);
        allEvents.value = []; // Set to empty array on error
      }
    };

    // Function to load team members from JSON
    const loadTeamMembers = async () => {
      try {
        const response = await fetch("data/team.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        teamMembers.value = data;
      } catch (error) {
        console.error("Error loading team members:", error);
        teamMembers.value = []; // Set to empty array on error
      }
    };

    // Function to load educational resources from JSON
    const loadEducationalResources = async () => {
      try {
        const response = await fetch("data/educational.json"); // New path
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        educationalResources.value = data;
      } catch (error) {
        console.error("Error loading educational resources:", error);
        educationalResources.value = []; // Set to empty array on error
      }
    };

    // Load data when the component is mounted
    onMounted(() => {
      loadEvents();
      loadTeamMembers();
      loadEducationalResources(); // Load educational resources
    });

    return {
      clubName,
      clubMotto,
      clubFocus,
      foundingYear,
      clubMission,
      typicalActivities,
      currentPage,
      allEvents,
      currentEventType,
      filteredEvents,
      teamMembers,
      educationalResources, // Expose educational resources
      contact,
      joinUsLink,
      currentYear,
    };
  },
}).mount("#app");
