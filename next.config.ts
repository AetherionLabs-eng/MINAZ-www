import type {
  NextConfig,
} from "next";

const nextConfig:
  NextConfig = {
  poweredByHeader: false,

  async redirects() {
    return [
      {
        source:
          "/index.html",

        destination:
          "/",

        permanent:
          true,
      },

      {
        source:
          "/about.html",

        destination:
          "/about",

        permanent:
          true,
      },

      {
        source:
          "/services.html",

        destination:
          "/services",

        permanent:
          true,
      },

      {
        source:
          "/gallery.html",

        destination:
          "/gallery",

        permanent:
          true,
      },

      {
        source:
          "/contact.html",

        destination:
          "/contact",

        permanent:
          true,
      },

      {
        source:
          "/quote.html",

        destination:
          "/quote",

        permanent:
          true,
      },

      {
        source:
          "/privacy.html",

        destination:
          "/privacy",

        permanent:
          true,
      },

      {
        source:
          "/terms.html",

        destination:
          "/terms",

        permanent:
          true,
      },

      {
        source:
          "/road-freight.html",

        destination:
          "/services/road-freight",

        permanent:
          true,
      },

      {
        source:
          "/air-freight.html",

        destination:
          "/services/air-freight",

        permanent:
          true,
      },

      {
        source:
          "/ocean-freight.html",

        destination:
          "/services/ocean-freight",

        permanent:
          true,
      },

      {
        source:
          "/cargo-express.html",

        destination:
          "/services/cargo-express",

        permanent:
          true,
      },

      {
        source:
          "/logistics.html",

        destination:
          "/services/logistics",

        permanent:
          true,
      },

      {
        source:
          "/transport-coordination.html",

        destination:
          "/services/transport-coordination",

        permanent:
          true,
      },
    ];
  },
};

export default nextConfig;