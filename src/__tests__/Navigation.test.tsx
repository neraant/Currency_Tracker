import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../App';

jest.mock('@components/common/Header/Header', () => {
  const { Link } = require('react-router-dom');
  return {
    Header: () => (
      <nav>
        <Link data-testid="link-home" to="/">
          Home
        </Link>
        <Link data-testid="link-timeline" to="/timeline">
          Timeline
        </Link>
        <Link data-testid="link-bank-card" to="/bank-card">
          Bank Card
        </Link>
        <Link data-testid="link-contacts" to="/contacts">
          Contacts
        </Link>
      </nav>
    ),
  };
});

jest.mock('@pages/HomePage', () => ({
  HomePage: () => <div data-testid="home-page">Home Page</div>,
}));

jest.mock('@pages/TimelinePage', () => ({
  TimelinePage: () => <div data-testid="timeline-page">Timeline Page</div>,
}));

jest.mock('@pages/BankCardPage', () => ({
  BankCardPage: () => <div data-testid="bank-card-page">Bank Card Page</div>,
}));

jest.mock('@pages/ContactsPage', () => ({
  ContactsPage: () => <div data-testid="contacts-page">Contacts Page</div>,
}));

jest.mock('@pages/NotFoundPage', () => ({
  NotFoundPage: () => <div data-testid="not-found-page">404 Not Found</div>,
}));

jest.mock('@components/Layout/Layout', () => {
  const { Header } = require('@components/common/Header/Header');
  return {
    Layout: ({ children }: { children: React.ReactNode }) => (
      <>
        <Header />
        <div data-testid="layout">{children}</div>
      </>
    ),
  };
});

jest.mock('@components/common/ScrollToTop/ScrollToTop', () => ({
  ScrollToTop: () => null,
}));

jest.mock('@context/ObserverConext', () => ({
  SubjectProvider: ({ children }: { children: ReactNode }) => children,
}));

jest.mock('@components/common/ErrorBoundary/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => children,
}));

const renderWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
};

describe('Navigation', () => {
  it('renders home page on "/" route', () => {
    renderWithRouter(['/']);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders timeline page on "/timeline" route', () => {
    renderWithRouter(['/timeline']);

    expect(screen.getByTestId('timeline-page')).toBeInTheDocument();
    expect(screen.getByText('Timeline Page')).toBeInTheDocument();
  });

  it('renders bank card page on "/bank-card" route', () => {
    renderWithRouter(['/bank-card']);

    expect(screen.getByTestId('bank-card-page')).toBeInTheDocument();
    expect(screen.getByText('Bank Card Page')).toBeInTheDocument();
  });

  it('renders contacts page on "/contacts" route', () => {
    renderWithRouter(['/contacts']);

    expect(screen.getByTestId('contacts-page')).toBeInTheDocument();
    expect(screen.getByText('Contacts Page')).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    renderWithRouter(['/unknown-route']);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('navigates to Timeline when clicking the link', async () => {
    renderWithRouter(['/']);

    const link = screen.getByTestId('link-timeline');
    await userEvent.click(link);

    expect(screen.getByTestId('timeline-page')).toBeInTheDocument();
  });
});
