import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('renders the portfolio landing page content', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /dave parisi, ms/i })).toBeInTheDocument();
  expect(screen.getByText(/building scalable and efficient software with purpose and precision\./i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /introduction/i })).toBeInTheDocument();
});

test('searches and selects portfolio sections from the top search bar', () => {
  render(<App />);

  const searchInput = screen.getByRole('textbox', { name: /search sections/i });
  fireEvent.change(searchInput, { target: { value: 'skills' } });

  fireEvent.click(screen.getByRole('option', { name: /skills & tools/i }));

  expect(screen.getByRole('heading', { name: /technologies i use to build and ship\./i })).toBeInTheDocument();
});

test('toggles the portfolio to light mode when the sun button is clicked', () => {
  const { container } = render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));

  expect(container.firstChild).toHaveClass('light-theme');
});

test('shows the user local time in the status pill', () => {
  jest.useFakeTimers().setSystemTime(new Date('2024-01-15T13:14:15'));
  render(<App />);

  expect(screen.getByText(/01:14:15 PM/i)).toBeInTheDocument();

  jest.useRealTimers();
});

test('shows static portfolio stats in the stats section', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /stats/i }));

  expect(screen.getByText(/years building projects/i)).toBeInTheDocument();
  expect(screen.getByText(/repositories on github/i)).toBeInTheDocument();
});

test('shows project detail outcome when opening a project', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /projects/i }));
  fireEvent.click(screen.getByRole('button', { name: /open details for crossfit companion/i }));

  expect(screen.getByRole('heading', { name: /outcome/i })).toBeInTheDocument();
  expect(screen.getByText(/production-ready planning workflow/i)).toBeInTheDocument();
});

test('returns to project cards when using back button from project detail', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /projects/i }));
  fireEvent.click(screen.getByRole('button', { name: /open details for crossfit companion/i }));

  fireEvent.click(screen.getByRole('button', { name: /back to projects/i }));

  expect(screen.getByRole('heading', { name: /selected work\./i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /open details for termidex/i })).toBeInTheDocument();
});

test('shows outbound links in contact section', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /contact/i }));

  const contactLinks = screen.getByRole('heading', { name: /let’s build something meaningful\./i }).nextElementSibling;
  const scoped = within(contactLinks);

  expect(scoped.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/dave-parisi');
  expect(scoped.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/daveparisi8');
  expect(scoped.getByRole('link', { name: /contact@dave-parisi.com/i })).toHaveAttribute('href', 'mailto:contact@dave-parisi.com');
});

test('supports keyboard navigation with ArrowDown and Enter in search', () => {
  render(<App />);

  const searchInput = screen.getByRole('textbox', { name: /search sections/i });
  fireEvent.change(searchInput, { target: { value: 's' } });

  fireEvent.keyDown(searchInput, { key: 'ArrowDown', code: 'ArrowDown' });
  fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

  expect(screen.getByRole('heading', { name: /technologies i use to build and ship\./i })).toBeInTheDocument();
});

test('closes and clears search input with Escape key', () => {
  render(<App />);

  const searchInput = screen.getByRole('textbox', { name: /search sections/i });
  fireEvent.change(searchInput, { target: { value: 'skills' } });

  expect(screen.getByRole('listbox', { name: /matching sections/i })).toBeInTheDocument();

  fireEvent.keyDown(searchInput, { key: 'Escape', code: 'Escape' });

  expect(searchInput).toHaveValue('');
  expect(screen.queryByRole('listbox', { name: /matching sections/i })).not.toBeInTheDocument();
});

test('expands and collapses engineering playbook categories in skills section', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /skills/i }));

  const toggle = screen.getByRole('button', { name: /core software engineering/i });
  fireEvent.click(toggle);

  expect(screen.getByText(/object-oriented design \(oop\)/i)).toBeInTheDocument();

  fireEvent.click(toggle);

  expect(screen.queryByText(/object-oriented design \(oop\)/i)).not.toBeInTheDocument();
});

test('shows currently exploring topics in dedicated section', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /currently exploring/i }));

  expect(screen.getByRole('heading', { name: /what i am actively learning right now\./i })).toBeInTheDocument();
  expect(screen.getByText(/mobile development with react native/i)).toBeInTheDocument();
  expect(screen.getByText(/kubernetes fundamentals/i)).toBeInTheDocument();
  expect(screen.getByText(/aws cloud services/i)).toBeInTheDocument();
});
