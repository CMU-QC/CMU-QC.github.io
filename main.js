const { createApp, ref, reactive, computed, onMounted, watch } = Vue;

createApp({
  setup() {
    // Club Information
    const clubName = ref("CMU Quantum");
    const clubMotto = ref("Advancing the Future, Bit by Qubit.");
    const clubFocus = ref(
      "cultivating quantum curiosity, education, and collective progress."
    );
    const foundingYear = ref(2024);
    const clubMission = ref(
      "fostering a community of quantum enthusiasts, researchers, and developers to push the boundaries of quantum technology"
    );
    const typicalActivities = ref([
      "quantum hackathons",
      "research projects",
      "educational workshops",
      "industry speaker events",
    ]);

    // Navigation
    const currentPage = ref("home"); // 'home', 'events', etc.

    // Events
    const allEvents = ref([]);
    const currentEventType = ref("upcoming"); // 'upcoming' or 'previous'

    // Filtered Events (computed)
    const filteredEvents = computed(() => {
      return allEvents.value.filter(
        (event) => event.status === currentEventType.value
      );
    });

    // Set current event type (used by buttons)
    const setEventType = (type) => {
      currentEventType.value = type;
    };

    // Debug watcher (optional)
    watch(filteredEvents, (newVal) => {
      console.log("Filtered events updated:", newVal);
    });

    // Load events
    const loadEvents = async () => {
      try {
        const response = await fetch("data/events.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Events loaded:", data); // Debug
        allEvents.value = data;
      } catch (error) {
        console.error("Error loading events:", error);
        allEvents.value = [];
      }
    };

    // Team Members
    const teamMembers = ref([]);

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
        teamMembers.value = [];
      }
    };

    // Educational Resources
    const educationalResources = ref([]);

    const loadEducationalResources = async () => {
      try {
        const response = await fetch("data/educational.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        educationalResources.value = data;
      } catch (error) {
        console.error("Error loading educational resources:", error);
        educationalResources.value = [];
      }
    };

    // Contact and Links
    const contact = reactive({
      email: "qc.at.cmu@gmail.com",
      phone: "",
      socialMedia: {
        linkedin:
          "https://www.linkedin.com/company/carnegie-mellon-quantum-computing/about/",
        github: "https://github.com/CMU-QC",
        twitter: "https://twitter.com/CMU_QC",
        discord: "https://discord.gg/gNBkFnwtpj",
      },
    });

    const joinUsLink = ref("https://forms.gle/your-cmuqc-join-form-link");

    // Footer
    const currentYear = computed(() => new Date().getFullYear());

    // Load all data on mount
    onMounted(() => {
      loadEvents();
      loadTeamMembers();
      loadEducationalResources();
    });

    return {
      // Club Info
      clubName,
      clubMotto,
      clubFocus,
      foundingYear,
      clubMission,
      typicalActivities,

      // Navigation
      currentPage,

      // Events
      allEvents,
      currentEventType,
      filteredEvents,
      setEventType,

      // Team & Education
      teamMembers,
      educationalResources,

      // Contact
      contact,
      joinUsLink,
      currentYear,
    };
  },
}).mount("#app");
